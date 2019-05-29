class GroupsController < ApplicationController
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
end
