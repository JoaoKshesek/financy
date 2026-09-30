import { createElement } from "react"
import { LoaderCircle, Plus, Tag, TriangleAlert } from "lucide-react"

import { PageWrapper } from "@/components/organisms/PageWrapper"
import { CategoryModal } from "@/components/organisms/CategoryModal"
import { ConfirmDialog } from "@/components/organisms/ConfirmDialog"
import { LabelButton } from "@/components/atoms"
import { CategoryCard, EmptyState, StatCard } from "@/components/molecules"
import { CATEGORY_ICONS } from "@/lib/utils/category-icons"
import { useCategories } from "./use.index"

export function Categories() {
  const {
    statCards,
    categories,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    editingCategory,
    handleNewCategory,
    handleEditCategory,
    deletingCategory,
    setDeletingCategory,
    deleting,
    handleAskDeleteCategory,
    handleConfirmDeleteCategory,
  } = useCategories()

  return (
    <PageWrapper
      title="Categorias"
      description="Organize suas transações por categorias"
      action={
        <LabelButton icon={<Plus />} onClick={handleNewCategory}>
          Nova categoria
        </LabelButton>
      }
    >
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-3 gap-4">
          {statCards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        {error && (
          <EmptyState
            variant="error"
            icon={<TriangleAlert />}
            title="Não foi possível carregar as categorias"
            description={error.message}
          />
        )}

        {loading && !categories.length && (
          <EmptyState
            icon={<LoaderCircle className="animate-spin" />}
            title="Carregando categorias…"
          />
        )}

        {!loading && !error && !categories.length && (
          <EmptyState
            icon={<Tag />}
            title="Nenhuma categoria ainda"
            description="Crie a primeira em “Nova categoria”."
            action={
              <LabelButton icon={<Plus />} onClick={handleNewCategory}>
                Nova categoria
              </LabelButton>
            }
          />
        )}

        {categories.length > 0 && (
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                color={category.color}
                icon={createElement(CATEGORY_ICONS[category.icon])}
                count={category.count}
                onEdit={() => handleEditCategory(category)}
                onDelete={() => handleAskDeleteCategory(category)}
              />
            ))}
          </div>
        )}
      </div>

      <CategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        category={editingCategory}
      />

      <ConfirmDialog
        open={Boolean(deletingCategory)}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        title="Excluir categoria"
        description={`"${deletingCategory?.title}" será removida. As transações dessa categoria ficam sem categoria.`}
        loading={deleting}
        onConfirm={handleConfirmDeleteCategory}
      />
    </PageWrapper>
  )
}
