import { ICategory } from "../interfaces/category/category.interface";
import {Category} from "../models/category.models"

export const findAllCategories = async () => {
    try {
        const categories = await Category.find();
        if (!categories) {
            throw new Error("no se a encontrado la lista de categorias")
        }
        return categories
    } catch (error) {
        return "DatabaseManager: findAllCategories Internal server error" + error
    }
}

export const findByIdCategory = async (id: string) => {
    try {
        const category = await Category.findOne({ _id: id })
        if (!category) {
            throw new Error("no se a encontrado la categoria")
        }
        return category
    } catch (error) {
        return "DatabaseManager: findByIdCategory Internal server error" + error
    }
}

export const createCategory = async (category: ICategory) => {
    try {
        const newCategory = new Category({
            name: category.name,
            description: category.description,
            image: category.image
        })
        const saveCategory = await newCategory.save()
        return saveCategory
    } catch (error) {
        return "DatabaseManager: createCategory Internal server error" + error
    }
}

export const updateCategory = async (id: string, category: ICategory) => {
    try {
        const categoryToUpdate = await Category.findOne({ _id: id })
        if (!categoryToUpdate) {
            throw new Error("no se a encontrado la categoria")
        }
        categoryToUpdate.name ? categoryToUpdate.name = category.name : null
        categoryToUpdate.description ? categoryToUpdate.description = category.description : null
        categoryToUpdate.image ? categoryToUpdate.image = category.image : null
        const saveCategory = await categoryToUpdate.save()
        return saveCategory
    } catch (error) {
        return "DatabaseManager: updateCategory Internal server error" + error
    }
}

export const deleteCategory = async (id: string) => {
    try {
        const categoryToDelete = await Category.findOne({ _id: id })
        if (!categoryToDelete) {
            throw new Error("no se a encontrado la categoria")
        }
        const deleteCategory = await categoryToDelete.deleteOne()
        return deleteCategory
    } catch (error) {
        return "DatabaseManager: deleteCategory Internal server error" + error
    }
}