class Restaurant 
  def self.search
    response = HTTParty.get "https://maps.googleapis.com/maps/api/place/details/json?reference=CmRYAAAAciqGsTRX1mXRvuXSH2ErwW-jCINE1aLiwP64MCWDN5vkXvXoQGPKldMfmdGyqWSpm7BEYCgDm-iv7Kc2PF7QA7brMAwBbAcqMr5i1f4PwTpaovIZjysCEZTry8Ez30wpEhCNCXpynextCld2EBsDkRKsGhSLayuRyFsex6JA6NPh9dyupoTH3g&key=AIzaSyD5xULBmWzVQIcTldWCvVHRv0JBEycklxg"
  end  
end