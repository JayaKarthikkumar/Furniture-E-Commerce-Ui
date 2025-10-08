import { Column, Schema, Table } from '@powersync/web';

const products = new Table({
  id: Column.text,
  name: Column.text,
  description: Column.text,
  price: Column.integer,
  original_price: Column.integer,
  discount: Column.integer,
  category: Column.text,
  stock: Column.integer,
  is_new: Column.integer,
  images: Column.text, // JSON stringified array
  created_at: Column.text,
  updated_at: Column.text,
});

const cart_items = new Table({
  id: Column.text,
  product_id: Column.text,
  user_id: Column.text,
  quantity: Column.integer,
  created_at: Column.text,
});

export const AppSchema = new Schema({
  products,
  cart_items,
});

export type Database = (typeof AppSchema)['types'];
export type Product = Database['products'];