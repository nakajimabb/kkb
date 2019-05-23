class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    per = params[:per].to_i.clamp(10, 60)
    @users = User.all
    if params[:search]
      p = params[:search]
      if p[:name].present?
        @users = @users.search_users(p[:name])
      end
      if p[:email].present?
        @users = @users.where('email LIKE ?', '%' + p[:email] + '%')
      end
    end
    @users = @users.page(params[:page]).per(per)
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
