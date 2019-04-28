class KkbMemberUser < ApplicationRecord
  belongs_to :kkb
  belongs_to :user

  enum member_type: {reader: 1, charge: 2}
end
