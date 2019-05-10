class Kkb < ApplicationRecord
  belongs_to :user
  belongs_to :kkb_category
  belongs_to :created_by, class_name: 'User', foreign_key: :created_by_id, optional: true
  has_many :kkb_member_users, dependent: :destroy
  has_many :kkb_member_groups, dependent: :destroy
  has_rich_text :content

  enum kkb_type: {bbs: 1}
  enum status: {denial: 0, waiting: 1, active: 2, pending: 3, closed: 4, draft:5}

  before_save :set_headline

  def set_headline
    self.tmp_content ||= ''   # TODO: tmp_content 後で削除
    text = ApplicationController.helpers.sanitize(content.to_s, :tags => %w(p br)).gsub('<br>', "<br>\n").gsub('</p>', "</p>\n")
    text = ApplicationController.helpers.strip_tags(text)
    self.headline = text.slice(0, 255)
  end

  def self.accessible(user_id)
    group_ids = GroupUser.where(user_id: user_id).pluck(:group_id)
    kkbs = Kkb.active.joins(:kkb_member_users).joins(:kkb_member_groups)
    kkbs = kkbs.where('kkbs.openness = true or kkbs.user_id = ? or kkbs.created_by_id = ? or kkb_member_users.user_id = ? or kkbs.group_id in (?) or kkb_member_groups.group_id in (?)',
                      user_id, user_id, user_id, group_ids.join(','), group_ids.join(','))
    kkbs.group('kkbs.id')
    kkbs
  end
end
