import { NextPage, NextPageContext } from 'next';
import { ReactNode } from 'react';
export interface Recipe {
    _id : string,
    recipeContent: string,
    ingredients: string,
    created: string,
    userId: string,
    image_url:string,
    prompt:string,
    title: string
}
