# Generated by Django 4.1.1 on 2022-09-20 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_alter_profile_avatar_alter_profile_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='total_lessons_learned',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='profile',
            name='total_words_learned',
            field=models.IntegerField(default=0),
        ),
    ]
