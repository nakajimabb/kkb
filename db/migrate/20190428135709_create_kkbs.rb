class CreateKkbs < ActiveRecord::Migration[6.0]
  def change
    create_table :kkbs do |t|
      t.string :title, null: false
      t.string :headline, null: false, default: ''
      t.text :tmp_content, null: false
      t.integer :kkb_type, null: false, default: 1, limit: 1
      t.integer :status, null: false
      t.references :user, foreign_key: true
      t.references :group, foreign_key: true
      t.boolean :openness, null: false, default: false
      t.references :kkb_category, null: false, foreign_key: true
      t.references :created_by, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
