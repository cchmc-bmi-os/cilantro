from django.contrib import admin

from avocado.columns.models import ColumnConceptField

def make_public(modeladmin, request, queryset):
    queryset.update(is_public=True)
make_public.short_description = 'Mark selected as public'

def make_not_public(modeladmin, request, queryset):
    queryset.update(is_public=False)
make_not_public.short_description = 'Mark selected as not public'


class ColumnConceptFieldInline(admin.TabularInline):
    model = ColumnConceptField


class ColumnConceptAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_public', 'category')
    list_filter = ('is_public', 'category')
    search_fields = ('name', 'description', 'keywords')
    inlines = (ColumnConceptFieldInline,)
    actions = (make_public, make_not_public)
    save_as = True


class EditorsColumnConceptAdmin(admin.ModelAdmin):
    """A suggested set of fields for editors that will not affect the integrity
    and implementation of the data.
    """
    list_display = ('name', 'category')
    list_filter = ('category',)
    search_fields = ('name', 'description', 'keywords')

    fieldsets = (
        (None, {'fields': ('name', 'description', 'keywords', 'category')}),
    )