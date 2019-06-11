class Group < ApplicationRecord
  REGISTRABLE_ATTRIBUTES = %i(code name group_type)

  has_many :group_users, dependent: :destroy
  accepts_nested_attributes_for :group_users, allow_destroy: true
  has_many :users, through: :group_users
  belongs_to :created_by, class_name: 'User', foreign_key: :created_by_id, optional: true

  enum group_type: {common: 1}

  validates :code, presence: true
  validates :name, presence: true

  def self.search(term)
    term = term.gsub(/\p{Blank}/, '')
    groups = Group.all
    if term =~ /^[0-9a-zA-Z]+$/
      groups = groups.where('code LIKE ?', '%' + term + '%')
    else
      groups = groups.where('name LIKE ?', '%' + term + '%')
    end
    groups
  end

  def nested_attributes
    p = permitted_attributes
    p[:group_users_attributes]  = group_users.eager_load(:user).order(:id).map do |group_user|
      user = group_user.user
      group_user.permitted_attributes.merge(user_code: user.code, user_label: user.name_with_code)
    end
    p
  end
end
