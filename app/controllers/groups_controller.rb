class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :edit, :update, :destroy]

  def index
    per = params[:per].to_i.clamp(10, 60)
    @groups = Group.all
    if params[:search]
      p = params[:search]
      if p[:name].present?
        @groups = Group.search(p[:name])
      end
    end
    @groups = @groups.page(params[:page]).per(per)
    render json: {groups: @groups, users: @groups.map{|group| [group.id, group.users]}.to_h, total_count: @groups.total_count}
  end

  def new
    @group = Group.new
    render json: @group.nested_attributes
  end

  def edit
    render json: @group.nested_attributes
  end

  def create
    @group = Group.new(group_params)
    @group.created_by_id = current_user.id
    @group.save!
    render json: @group
  end

  def update
    @group.update_attributes(group_params)
    render json: @group.to_json
  end

  private

  def set_group
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(Group::REGISTRABLE_ATTRIBUTES + [group_users_attributes: GroupUser::REGISTRABLE_ATTRIBUTES])
  end
end
