class Restaurant #< ActiveRecord::Base
  def self.search(location)
    path = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=500&opennow=true&types=restaurant&key=AIzaSyD5xULBmWzVQIcTldWCvVHRv0JBEycklxg"
    
    response = HTTParty.get path

  end  
end