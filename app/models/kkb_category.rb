class KkbCategory < ApplicationRecord
  belongs_to :parent, class_name: "KkbCategory", foreign_key: :parent_id, optional: true
  has_many :children, class_name: "KkbCategory", foreign_key: :parent_id, dependent: :destroy
  belongs_to :created_by, class_name: 'User', foreign_key: :created_by_id, optional: true
end
