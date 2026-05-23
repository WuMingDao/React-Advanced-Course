import type {
  ArticleDisplay,
  ArticleWithAuthorProfile,
  InsertArticle,
  UpdateArticle,
} from '@/types/Article';
import { client } from '@/utils/neon';

const ARTICLE_TABLE_NAME = 'article';

export async function getAllArticles() {
  const { data, error } = await client.from(ARTICLE_TABLE_NAME).select('*');

  if (error) {
    throw error;
  }

  console.log(data);
  return data;
}

export async function getArticleById(articleId: number) {
  const { data, error } = await client
    .from('article_with_user_profile')
    .select('*')
    .eq('article_id', articleId)
    .single();

  if (error) {
    throw error;
  }

  return mapToArticleDisplay(data);
}

export async function insertArticle(insertArticle: InsertArticle) {
  const { data, error } = await client
    .from(ARTICLE_TABLE_NAME)
    .insert(insertArticle)
    .select();

  if (error) {
    throw error;
  }

  console.log(data);
  return data;
}

export async function updateArticleById(
  articleId: number,
  updateArticle: UpdateArticle,
) {
  const { data, error } = await client
    .from(ARTICLE_TABLE_NAME)
    .update(updateArticle)
    .eq('id', articleId)
    .select();

  if (error) {
    throw error;
  }

  console.log(data);
  return data;
}

export async function deleteArticleById(articleId: number) {
  const { error } = await client
    .from(ARTICLE_TABLE_NAME)
    .delete()
    .eq('id', articleId);

  if (error) {
    throw error;
  }
}

function mapToArticleDisplay(row: ArticleWithAuthorProfile): ArticleDisplay {
  if (
    !row.article_id ||
    !row.author_id ||
    !row.title ||
    !row.content ||
    !row.created_at ||
    !row.updated_at ||
    !row.name ||
    !row.image
  ) {
    throw new Error('Invalid article data');
  }

  return {
    id: row.article_id,
    author_id: row.author_id,
    title: row.title,
    content: row.content,
    created_at: row.created_at,
    updated_at: row.updated_at,
    author: {
      name: row.name,
      image: row.image,
    },
  };
}
