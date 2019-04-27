class AddEtcToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :code, :string, null: false
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :first_kana, :string
    add_column :users, :last_kana, :string
    add_column :users, :sex, :integer, null: false, default: 0, limit: 1
    add_column :users, :birthday, :date
    add_index :users, :code, unique: true
  end
end
