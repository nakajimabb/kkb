class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  protect_from_forgery :except => :update

  def index
    per = params[:per].to_i.clamp(10, 60)
    @users = User.all.page(params[:page]).per(per)
    render json: {users: @users, total_count: @users.total_count}
  end

  def edit
    render json: @user
  end

  def update
    @user.update_attributes(user_params)
    render json: @user
  end

private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :code, :first_name, :last_name, :first_kana, :last_kana, :birthday)
  end
end
