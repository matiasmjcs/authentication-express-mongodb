import { Request, Response } from "express";
import { IcategoryControllers } from "../interfaces/category/categoryControllers.interface";
import { createCategory, deleteCategory, findAllCategories, findByIdCategory, updateCategory } from "../dataBaseManager/category";

export class CategoryControllers implements IcategoryControllers {
    async findAll(req: Request, res: Response): Promise<Response>{
        try {
            const categories = await findAllCategories()
            if (!categories) {
                throw new Error("no se a encontrado la lista de categorias")
            }
            return res.status(200).json({
                categories
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    };
    async findById(req: Request, res: Response): Promise<Response>{
        try {
            const id = req.params.id
            const category = await findByIdCategory(id)
            if (!category) {
                throw new Error("no se a encontrado la categoria")
            }
            return res.status(200).json({
                category
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    };
    async create(req: Request, res: Response): Promise<Response>{
        try {
            const category = req.body
            const newCategory = await createCategory(category)
            return res.status(201).json({
                newCategory
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    };
    async update(req: Request, res: Response): Promise<Response>{
        try {
            const id = req.params.id
            const category = req.body
            const newCategory = await updateCategory(id, category)
            return res.status(200).json({
                newCategory
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    };
    async delete(req: Request, res: Response): Promise<Response>{
        try {
            const id = req.params.id
            const category = await deleteCategory(id)
            return res.status(200).json({
                category
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    };
}