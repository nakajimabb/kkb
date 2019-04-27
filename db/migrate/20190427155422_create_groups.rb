class CreateGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :groups do |t|
      t.string :code, null: false
      t.string :name, null: false
      t.integer :group_type, null: false, default: 1, limit: 1
      t.references :created_by, foreign_key: { to_table: :users }

      t.timestamps
    end
    add_index :groups, :code, unique: true
  end
end
