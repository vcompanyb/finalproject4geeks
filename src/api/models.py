from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    phone = db.Column(db.Boolean(), unique=False, nullable=True)

    def __init__(self, email, password, is_active=True):
        if email == '' or password == '':
            raise Exception("Email and user required")
            
        self.email = email
        self.password = password
        self.is_active = is_active


    @classmethod
    def create_user(cls, email, password):
        user = cls(email, password)
        
        db.session.add(user)
        db.session.commit()

    @classmethod
    def get_with_login_credentials(cls, email, password):
        return cls.query.filter_by(email=email).filter_by(password=password).one_or_none()

    @classmethod
    def get(cls, id):
        return cls.query.get(id)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }