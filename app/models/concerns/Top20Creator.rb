module Top20Creator
  extend ActiveSupport::Concern

  class_methods do
    def create_top_20(attributes)
      attributes.each do |attribute, pluralize|
        attribute_name = pluralize ? attribute.to_s.pluralize : attribute.to_s

        define_singleton_method("top_20_#{attribute_name}") do |position = nil|
          if position.nil?
            sum_and_average_20(all.order(attribute => :desc).limit(20).pluck(attribute))
          else
            sum_and_average_20(by_position(position).order(attribute => :desc).limit(20).pluck(attribute))
          end
        end
      end
    end
  end

end