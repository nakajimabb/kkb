class KkbsController < ApplicationController
  before_action :set_kkb, only: [:show, :edit, :update, :destroy]

  def index
    per = params[:per].to_i.clamp(12, 60)
    @kkbs = Kkb.accessible(current_user).order(id: :desc).page(params[:page]).per(per)
    render json: { kkbs: @kkbs, total_count: @kkbs.total_count }
  end

  def all
    per = params[:per].to_i.clamp(12, 60)
    @kkbs = Kkb.all.order(id: :desc).page(params[:page]).per(per)
    render json: { kkbs: @kkbs, total_count: @kkbs.total_count }
  end

  def show
    data = {id: @kkb.id, title: @kkb.title, content: @kkb.content.to_s}
    render json: data
  end

  def new
    @title = '板作成'
    @kkb = Kkb.new(user_id: current_user.id, status: :waiting)
  end

  def edit
    @title = '板編集'
    render :new
  end

  def create
    @kkb = Kkb.new(kkb_params)
    @kkb.created_by_id = current_user.id
    @kkb.save!
  end

  def update
    @kkb.update!(kkb_params)
    render :create
  end

private

  def set_kkb
    @kkb = Kkb.find(params[:id])
  end

  def kkb_params
    params.require(:kkb).permit(:title, :content, :kkb_type, :status, :user_id, :group_id, :openness, :kkb_category_id)
  end
end
