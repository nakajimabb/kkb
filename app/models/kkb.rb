class Kkb < ApplicationRecord
  belongs_to :user
  belongs_to :kkb_category
  belongs_to :created_by, class_name: 'User', foreign_key: :created_by_id, optional: true

  enum kkb_type: {bbs: 1}
  enum status: {denial: 0, waiting: 1, active: 2, pending: 3, closed: 4, draft:5}
end
