class CreateKkbMemberUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :kkb_member_users do |t|
      t.references :kkb, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :member_type, null: false, default: 1, limit: 1

      t.timestamps
    end
    add_index :kkb_member_users, [:kkb_id, :user_id], unique: true
  end
end
