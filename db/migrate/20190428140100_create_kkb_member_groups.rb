class CreateKkbMemberGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :kkb_member_groups do |t|
      t.references :kkb, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true
      t.integer :member_type, null: false, default: 1, limit: 1

      t.timestamps
    end
    add_index :kkb_member_groups, [:kkb_id, :group_id], unique: true
  end
end
