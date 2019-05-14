class UsersController < ApplicationController
  def index
    per = params[:per].to_i.clamp(10, 60)
    @users = User.all.page(params[:page]).per(per)
    render json: {users: @users, total_count: @users.total_count}
  end
end
