class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum sex: {male: 1, female: 2}

  validates :code,
            uniqueness: { case_sensitive: :false },
            length: { minimum: 2, maximum: 16 }

  def name
    [last_name, first_name].join(' ')
  end

  def name_with_code
    name + '(' + code + ')'
  end

end
