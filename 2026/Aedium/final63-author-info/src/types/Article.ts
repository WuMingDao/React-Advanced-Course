import type { Tables, TablesInsert, TablesUpdate } from './database';

export type InsertArticle = TablesInsert<'article'>;

export type UpdateArticle = TablesUpdate<'article'>;

export type Article = Tables<'article'>;

export type ArticleWithAuthorProfile = Tables<'article_with_user_profile'>;

export type ArticleDisplay = Article & {
  author: {
    name: string;
    image: string | null;
  };
};
