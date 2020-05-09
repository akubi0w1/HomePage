class User < ApplicationRecord
    has_one :introduction, :dependent => :destroy
    accepts_nested_attributes_for :introduction
    has_many :lectures
    has_secure_password

    before_save :downcase_student_id

    validates :name, presence: true
    validates :student_id, presence: true, length: {is: 7}

    private
      def downcase_student_id
        self.student_id.downcase!
      end
end