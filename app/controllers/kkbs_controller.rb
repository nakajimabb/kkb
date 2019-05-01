class KkbsController < ApplicationController
  def index
    @kkbs = Kkb.all.limit(60)
    render json: @kkbs
  end
end
