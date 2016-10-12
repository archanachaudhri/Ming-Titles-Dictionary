class MyMailer < Devise::Mailer
  helper :application # gives access to all helpers defined within `application_helper`.
  # helper :devise # gives access to all helpers defined within `devise_helper`.
  #include Devise::Controllers # Optional. eg. `confirmation_url`
  include Devise::Mailers::Helpers
  default template_path: 'devise/mailer' # to make sure that your mailer uses the devise views
  default from: 'devnull@cygnus.lib.uci.edu'

  def greeting(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Ming Government Official Titles: A Crowd-Translation Project')
  end

  def new_translation(user, translation)
    @user = user
    @translation = translation
    mail(to: @user.email, subject: 'New Translation Submitted')
  end

  def acceptance(user)
    @user = user
    mail(to: @user.email, subject: 'Congratulations! You have been accepted as a contributing scholar.')
  end

end