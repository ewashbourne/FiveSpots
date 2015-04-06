class Restaurant #< ActiveRecord::Base
  def self.search(location)
    location ||= '33.7722636,-84.3661896'
    base = "https://maps.googleapis.com/maps/api/"
    search_type = "place/nearbysearch/json"
    query = "?location=" + location + "&radius=500&opennow=true&types=restaurant" 
    key = '&key=AIzaSyAwBJ9Ra3Iwzm0VVPDIi-cV0xD0lWq8AP0'
    
    query_url = base + search_type + query + key
    response = HTTParty.get query_url

  end  
end