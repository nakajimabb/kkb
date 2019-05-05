class KkbsController < ApplicationController
  before_action :set_kkb, only: [:show, :update, :destroy]

  def index
    per = params[:per].to_i.clamp(12, 60)
    @kkbs = Kkb.all.order(id: :desc).page(params[:page]).per(per)
    render json: { kkbs: @kkbs, total_count: @kkbs.total_count }
  end

  def show
    render json: @kkb
  end

private

  def set_kkb
    @kkb = Kkb.find(params[:id])
  end
end
