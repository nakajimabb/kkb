class CreateKkbCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :kkb_categories do |t|
      t.string :code, null: false
      t.string :name, null: false
      t.integer :rank, null: false
      t.references :parent, foreign_key: { to_table: :kkb_categories }
      t.references :created_by, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
    add_index :kkb_categories, :code, unique: true
  end
end
