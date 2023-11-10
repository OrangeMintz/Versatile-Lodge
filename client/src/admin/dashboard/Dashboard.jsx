import './dashboard.css';


const Dashboard = () => {
    return (
        <div>
        
            <header class="header">
                <section class="flex"> 
                    <div class="icons">
                        <div id="menu-btn" class="fas fa-bars"></div>
                        <a href="home.html" class="logo">Versatile Lodge</a>
                    </div>
                    
                    <form action="" method="post" class="search-form">
                        <input type="text" name="search_box" placeholder="search here..." required maxlength="100" />
                        <button type="submit" class="fas fa-search" name="search_box"></button>
                    </form>
                    
                    <div class="icons">
        
                        <div id="search-btn" class="fas fa-search"></div>
                        <div id="toggle-btn" class="fas fa-sun"></div>
                        <div id="question-btn" class="fas fa-question"></div>
                        <div id="user-btn" class="fas fa-user"></div>
                        <div id="drop-btn" class="fas fa-chevron-down"></div>
        
                    </div>
                    
                    <div class="profile">
                        <img src="./etc/ref ansai.jpg" alt="" />
                        <h3>Anzai Mitsuyoshi</h3>
                        <span>teacher</span>
                        <a href="profile.html" class="btn">view profile</a>
                        <div class="flex-btn">
                            <a href="login.html" class="option-btn">login</a>
                            <a href="register.html" class="option-btn">register</a>
        
                        </div>
        
        
                    </div>
                </section>
            </header>
        
            

        
        
        
        
        
        
        
        
        
            <footer class="footer">
            
                &copy; copyright @ 2023 by <span>"the "</span> || all rights reserved!
            
            </footer>
        
        </div>
    )
}

export default Dashboard;