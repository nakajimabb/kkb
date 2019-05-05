# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_28_140100) do

  create_table "group_users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "group_id", null: false
    t.bigint "user_id", null: false
    t.integer "member_type", limit: 1, default: 1, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["group_id", "user_id"], name: "index_group_users_on_group_id_and_user_id", unique: true
    t.index ["group_id"], name: "index_group_users_on_group_id"
    t.index ["user_id"], name: "index_group_users_on_user_id"
  end

  create_table "groups", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "code", null: false
    t.string "name", null: false
    t.integer "group_type", limit: 1, default: 1, null: false
    t.bigint "created_by_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["code"], name: "index_groups_on_code", unique: true
    t.index ["created_by_id"], name: "index_groups_on_created_by_id"
  end

  create_table "kkb_categories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "code", null: false
    t.string "name", null: false
    t.integer "rank", null: false
    t.bigint "parent_id"
    t.bigint "created_by_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["code"], name: "index_kkb_categories_on_code", unique: true
    t.index ["created_by_id"], name: "index_kkb_categories_on_created_by_id"
    t.index ["parent_id"], name: "index_kkb_categories_on_parent_id"
  end

  create_table "kkb_member_groups", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "kkb_id", null: false
    t.bigint "group_id", null: false
    t.integer "member_type", limit: 1, default: 1, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["group_id"], name: "index_kkb_member_groups_on_group_id"
    t.index ["kkb_id", "group_id"], name: "index_kkb_member_groups_on_kkb_id_and_group_id", unique: true
    t.index ["kkb_id"], name: "index_kkb_member_groups_on_kkb_id"
  end

  create_table "kkb_member_users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "kkb_id", null: false
    t.bigint "user_id", null: false
    t.integer "member_type", limit: 1, default: 1, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["kkb_id", "user_id"], name: "index_kkb_member_users_on_kkb_id_and_user_id", unique: true
    t.index ["kkb_id"], name: "index_kkb_member_users_on_kkb_id"
    t.index ["user_id"], name: "index_kkb_member_users_on_user_id"
  end

  create_table "kkbs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "title", null: false
    t.integer "kkb_type", limit: 1, default: 1, null: false
    t.text "content", null: false
    t.integer "status", null: false
    t.bigint "user_id"
    t.bigint "group_id"
    t.boolean "openness", default: false, null: false
    t.bigint "kkb_category_id", null: false
    t.bigint "created_by_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["created_by_id"], name: "index_kkbs_on_created_by_id"
    t.index ["group_id"], name: "index_kkbs_on_group_id"
    t.index ["kkb_category_id"], name: "index_kkbs_on_kkb_category_id"
    t.index ["user_id"], name: "index_kkbs_on_user_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "code", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "first_kana"
    t.string "last_kana"
    t.integer "sex", limit: 1, default: 0, null: false
    t.date "birthday"
    t.index ["code"], name: "index_users_on_code", unique: true
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "group_users", "groups"
  add_foreign_key "group_users", "users"
  add_foreign_key "groups", "users", column: "created_by_id"
  add_foreign_key "kkb_categories", "kkb_categories", column: "parent_id"
  add_foreign_key "kkb_categories", "users", column: "created_by_id"
  add_foreign_key "kkb_member_groups", "groups"
  add_foreign_key "kkb_member_groups", "kkbs"
  add_foreign_key "kkb_member_users", "kkbs"
  add_foreign_key "kkb_member_users", "users"
  add_foreign_key "kkbs", "groups"
  add_foreign_key "kkbs", "kkb_categories"
  add_foreign_key "kkbs", "users"
  add_foreign_key "kkbs", "users", column: "created_by_id"
end
