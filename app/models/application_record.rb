class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def permitted_attributes
    ActionController::Parameters.new(self.attributes).permit(self.class::REGISTRABLE_ATTRIBUTES)
  end
end
