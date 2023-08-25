class CreateDraftRecordTeams < ActiveRecord::Migration[7.0]
  def change
    create_table :draft_record_teams, id: :uuid do |t|
      t.belongs_to :draft_record, type: :uuid, index: true, foreign_key: true
      t.belongs_to :team, type: :uuid, index: true, foreign_key: true

      t.timestamps
    end
  end
end
