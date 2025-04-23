import slugify from 'slugify';
import { Model } from 'mongoose';

export async function generateUniqueSlug(
  model: Model<any>,
  text: string,
): Promise<string> {
  const baseSlug = slugify(text, {
    lower: true,
    strict: true,
    locale: 'vi',
  });

  let slug = baseSlug;
  let count = 1;

  // Lặp cho đến khi tìm được slug không trùng
  while (await model.exists({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
}
