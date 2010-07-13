from django.test import TestCase
from django.core.cache import cache as djcache

from avocado.criteria.cache import cache
from avocado.models import CriterionConcept

__all__ = ('CriterionCacheTestCase',)

class CriterionCacheTestCase(TestCase):
    fixtures = ['test_data.yaml']

    def test_get(self):
        concept_id = 1
        key = cache.id_key % concept_id
        self.assertFalse(djcache.has_key(key))

        concept = cache.get(concept_id)
        self.assertNotEqual(concept, None)
        self.assertEqual(djcache.get(key), concept)

        djcache.delete(key)

        queryset = CriterionConcept.objects.none()
        concept = cache.get(concept_id, queryset=queryset)
        self.assertEqual(concept, None)
        self.assertFalse(djcache.has_key(key))

    def test_get_many(self):
        concept_ids = [1, 2]
        concepts = list(cache.get_many(concept_ids))

        self.assertEqual([x.id for x in concepts], concept_ids)
        for i, x in enumerate(concept_ids):
            key = cache.id_key % x
            self.assertEqual(djcache.get(key), concepts[i])

    def test_get_fields(self):
        concept_id = 1
        key = cache.id_key % concept_id
        fkey = cache.field_id_key % concept_id

        self.assertFalse(djcache.has_key(key))
        self.assertFalse(djcache.has_key(fkey))

        fields = cache.get_fields(concept_id)

        self.assertTrue(djcache.has_key(key))
        self.assertEqual(djcache.get(fkey), fields)
        
        self.assertEqual(cache.get_fields(3, ret_val=False), False)