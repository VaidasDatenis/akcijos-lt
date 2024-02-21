export enum RecipeEnum {
    MAXIMA_RECIPES = 'maxima_recipes',
    IKI_RECIPES = 'iki_recipes',
    RIMI_RECIPES = 'rimi_recipes',
    LIDL_RECIPES = 'lidl_recipes'
}

export interface Recipe {
    id: string;
    average_cost: string;
    imageUrl: string;
    ingredients: string[];
    name: string;
    process: string;
}
