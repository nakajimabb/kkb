class Kkb < ApplicationRecord
  belongs_to :user
  belongs_to :kkb_category
  belongs_to :created_by, class_name: 'User', foreign_key: :created_by_id, optional: true
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
end
