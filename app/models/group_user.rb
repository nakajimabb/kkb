class GroupUser < ApplicationRecord
  belongs_to :group
  belongs_to :user

  enum member_type: {normal: 1}

  validates :group_id, presence: true
  validates :user_id, presence: true
end
