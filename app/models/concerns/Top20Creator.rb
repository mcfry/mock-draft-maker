module Top20Creator
  extend ActiveSupport::Concern

  # Insure that included class implements by_position scope - imp can differ
  # Insure that included class implements sum_and_average_20 - other methods dependent, so not included here

  class_methods do
    def create_top_20(attributes)
      attributes.each do |attribute, options|
        attribute_name = options[:pluralize] ?  attribute.to_s.pluralize : attribute.to_s

        sort_dir = options[:order_asc] ? 'asc' : 'desc'

        define_singleton_method("top_20_#{attribute_name}") do |position = nil|
          if position.nil?
            sum_and_average_20(where.not(attribute => nil).order(attribute => sort_dir).limit(20).pluck(attribute))
          else
            sum_and_average_20(by_position(position).where.not(attribute => nil).order(attribute => sort_dir).limit(20).pluck(attribute))
          end
        end
      end
    end
  end

end