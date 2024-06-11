import React from 'react'
import SmilingRock_App from './AllTheme/SmilingRock/SmilingRock_App'
import DaimondTine_App from './AllTheme/DaimondTine/DaimondTine_App'
import Elveester_App from './AllTheme/Elveester/Elveester_App'
import MobileApp_App from './AllTheme/MobileApp/MobileApp_App'

export default function ThemeRoutes() {


  return (
    <div>
      <div>
        {false && <SmilingRock_App />}
      </div>
      <div>
        {false && <DaimondTine_App />}
      </div>
      <div>
        {true && <Elveester_App />}
      </div>
      <div>
        {false && <MobileApp_App />}
      </div>
    </div>
  )
}
