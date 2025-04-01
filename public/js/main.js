// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // 向下滚动
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // 向上滚动
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// 移动端菜单
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// 导航链接激活状态
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // 这里可以添加表单提交到服务器的代码
        console.log('Form submitted:', data);
        
        // 显示成功消息
        showNotification('感谢您的留言，我们会尽快回复！', 'success');
        this.reset();
    });
}

// 通知提示
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // 添加动画
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // 3秒后移除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 添加页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    // 初始化所有动画元素
    initializeAnimations();
});

// 初始化动画
function initializeAnimations() {
    // 添加滚动显示动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 添加延迟动画
                const children = entry.target.querySelectorAll('.fade-in-child');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    // 为需要动画的元素添加观察
    document.querySelectorAll('.feature-card, .spec-item, .application-card, .download-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// 图片懒加载
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// 添加滚动进度条
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// 添加返回顶部按钮
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 处理下载点击事件
function handleDownload(event, type) {
    event.preventDefault();
    
    // 获取下载链接
    const downloadUrl = event.currentTarget.href;
    
    // 检查用户是否已登录或有权限下载（这里可以根据实际需求修改）
    const canDownload = true; // 这里可以添加实际的权限检查逻辑
    
    if (canDownload) {
        // 创建一个表单来收集用户信息
        const userInfo = {
            name: localStorage.getItem('userName'),
            company: localStorage.getItem('userCompany'),
            email: localStorage.getItem('userEmail')
        };
        
        // 如果没有用户信息，显示信息收集弹窗
        if (!userInfo.name || !userInfo.company || !userInfo.email) {
            showDownloadForm(type, downloadUrl);
        } else {
            // 如果已有用户信息，直接开始下载
            startDownload(downloadUrl);
        }
    } else {
        alert('请先登录或联系技术支持获取下载权限');
    }
}

// 显示下载信息收集表单
function showDownloadForm(type, downloadUrl) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="download-form">
            <h3>下载${type}</h3>
            <p>请填写以下信息以开始下载</p>
            <form id="downloadForm">
                <div class="form-group">
                    <input type="text" id="userName" placeholder="您的姓名" required>
                </div>
                <div class="form-group">
                    <input type="text" id="userCompany" placeholder="公司名称" required>
                </div>
                <div class="form-group">
                    <input type="email" id="userEmail" placeholder="电子邮箱" required>
                </div>
                <div class="form-buttons">
                    <button type="submit" class="btn primary">开始下载</button>
                    <button type="button" class="btn secondary" onclick="closeDownloadForm()">取消</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加表单提交事件
    document.getElementById('downloadForm').onsubmit = function(e) {
        e.preventDefault();
        
        // 保存用户信息
        const userName = document.getElementById('userName').value;
        const userCompany = document.getElementById('userCompany').value;
        const userEmail = document.getElementById('userEmail').value;
        
        localStorage.setItem('userName', userName);
        localStorage.setItem('userCompany', userCompany);
        localStorage.setItem('userEmail', userEmail);
        
        // 关闭表单并开始下载
        closeDownloadForm();
        startDownload(downloadUrl);
    };
}

// 关闭下载表单
function closeDownloadForm() {
    const modal = document.querySelector('.download-modal');
    if (modal) {
        modal.remove();
    }
}

// 开始下载
function startDownload(url) {
    window.location.href = url;
} 