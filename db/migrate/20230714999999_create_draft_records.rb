class CreateDraftRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :draft_records, id: :uuid do |t|
      t.integer :year
      t.integer :speed
      t.integer :needs_vs_value
      t.integer :randomness
      t.string :value_type

      t.timestamps
    end
  end
end
