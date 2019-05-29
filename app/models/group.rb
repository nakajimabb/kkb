class Group < ApplicationRecord
  has_many :group_users, dependent: :destroy
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
end
