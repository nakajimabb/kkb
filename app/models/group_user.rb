class GroupUser < ApplicationRecord
  REGISTRABLE_ATTRIBUTES = %i(id group_id user_id member_type _destroy)

  belongs_to :group
  belongs_to :user

  enum member_type: {normal: 1, hidden: 2}

  validates :group, presence: true
  validates :user, presence: true
  validates :user_id, :uniqueness => {scope: :group_id}
end
