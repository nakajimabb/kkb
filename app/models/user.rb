class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum sex: {unkonwn: 0, male: 1, female: 2}

  validates :code,
            uniqueness: { case_sensitive: :false },
            length: { minimum: 2, maximum: 16 }

  def name
    [last_name, first_name].join(' ')
  end

  def kana
    [last_kana, first_kana].join(' ')
  end

  def name_with_code
    name + '(' + code + ')'
  end

  def self.search_users(user_name)
    user_name = user_name.gsub(/\p{Blank}/, '')
    users = User.all
    if user_name =~ /^[0-9a-zA-Z]+$/
      users = users.where('code LIKE ?', '%' + user_name + '%')
    elsif user_name =~ /^[\p{Hiragana}]+$/ or user_name =~ /^[\p{Katakana}]+$/
      user_name = user_name.tr('ぁ-ん','ァ-ン')
      users = users.where('concat(last_kana, first_kana) LIKE ?', '%' + user_name + '%')
    else
      users = users.where('concat(last_name, first_name) LIKE ?', '%' + user_name + '%')
    end
    users
  end
end
