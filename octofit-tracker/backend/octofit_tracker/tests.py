from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelSmokeTest(TestCase):
    def test_team_create(self):
        t = Team.objects.create(name='Test Team')
        self.assertEqual(str(t), 'Test Team')
    def test_user_create(self):
        t = Team.objects.create(name='Test Team')
        u = User.objects.create(name='Test User', email='test@example.com', team=t)
        self.assertEqual(str(u), 'Test User')
    def test_activity_create(self):
        t = Team.objects.create(name='Test Team')
        u = User.objects.create(name='Test User', email='test@example.com', team=t)
        a = Activity.objects.create(user=u, type='Run', duration=10, date='2024-01-01')
        self.assertEqual(str(a), 'Test User - Run')
    def test_workout_create(self):
        w = Workout.objects.create(name='W1', description='desc', suggested_for='all')
        self.assertEqual(str(w), 'W1')
    def test_leaderboard_create(self):
        t = Team.objects.create(name='Test Team')
        u = User.objects.create(name='Test User', email='test@example.com', team=t)
        l = Leaderboard.objects.create(user=u, score=42)
        self.assertEqual(str(l), 'Test User - 42')
