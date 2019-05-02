class KkbsController < ApplicationController
  def index
    per = params[:per].to_i.clamp(12, 60)
    @kkbs = Kkb.all.page(params[:page]).per(per)
    render json: { kkbs: @kkbs, total_count: @kkbs.total_count }
  end
end
